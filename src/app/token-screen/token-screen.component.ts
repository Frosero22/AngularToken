import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http'; // Importar HttpClientModule y HttpClient

@Component({
  selector: 'app-token-screen',
  templateUrl: './token-screen.component.html',
  styleUrls: ['./token-screen.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule] // Agregar HttpClientModule aquí
})
export class TokenScreenComponent {
  token: string = ''; // Inicializar token vacío
  counter: number = 15; // Contador inicial
  dataTable: Array<{ token: string; horaCreacion: string; utilizado: boolean; cliente: string | null }> = []; // DataTable con campo cliente
  private intervalId: any; // Variable para almacenar el ID del intervalo
  isCounting: boolean = false; // Estado del contador

  constructor(private http: HttpClient) {
    // No iniciar el contador automáticamente
  }

  toggleCountdown() {
    if (this.isCounting) {
      this.stopCountdown(); // Detener el contador si ya está corriendo
    } else {
      this.startCountdown(); // Iniciar el contador si no está corriendo
    }
  }

  async startCountdown() {
    // Hacer el llamado POST a la API para obtener el token
    try {
      const response: any = await this.http.post('http://localhost:3000/tokens', {}).toPromise();
      this.token = response.token; // Asignar el token recibido al input
      console.log('Token obtenido:', this.token); // Para depurar el token obtenido
    } catch (error) {
      console.error('Error al obtener el token:', error);
      return; // Si hay un error, no continuar con el contador
    }

    this.counter = 15; // Reiniciar el contador
    this.resetInterval(); // Limpiar el intervalo anterior
    this.isCounting = true; // Establecer que el contador está activo

    // Establecer un nuevo intervalo
    this.intervalId = setInterval(async () => {
      this.counter--; // Decrementar el contador

      if (this.counter < 0) {
        clearInterval(this.intervalId); // Detener el intervalo
        this.isCounting = false; // El contador ya no está activo
        return; // Salir del intervalo si el contador es negativo
      }

      if (this.counter === 0) {
        await this.updateTokenStatus();
        await this.fetchData(); // Obtener la lista de tokens y llenar el dataTable
        this.startCountdown(); // Reiniciar el contador para el siguiente ciclo
      }
    }, 1000); // Decrementar cada segundo
  }

  stopCountdown() {
    this.resetInterval(); // Detener el intervalo
    this.token = ''; // Limpiar el token del input
    this.isCounting = false; // Establecer que el contador ya no está activo
  }

  resetInterval() {
    // Detener cualquier intervalo existente
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  async fetchData() {
    try {
      const result: any = await this.http.get('http://localhost:3000/tokens').toPromise();
      // Agregar los resultados al dataTable
      this.dataTable = [];
      result.forEach((item: any) => {
        
        this.dataTable.push({
          token: item.token,
          horaCreacion: item.fecha_creacion,
          utilizado: item.utilizado,
          cliente: item.cliente // Agregar el campo cliente
        });
      });
      console.log('DataTable actualizado:', this.dataTable); // Para depurar el contenido del DataTable
    } catch (error) {
      console.error('Error al obtener los datos del DataTable:', error);
    }
  }

  async updateTokenStatus() {
    try {
      const body = { token: this.token }; // Crear el cuerpo de la solicitud con el token
      const response: any = await this.http.post('http://localhost:3000/tokens/update-status', body).toPromise();
      console.log('Respuesta de actualización de estado:', response); // Para depurar la respuesta
    } catch (error) {
      console.error('Error al actualizar el estado del token:', error);
    }
  }


  generateToken(): string {
    // Generar un número aleatorio de 6 dígitos
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
}
