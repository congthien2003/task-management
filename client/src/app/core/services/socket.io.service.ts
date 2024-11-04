import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { io, Socket } from "socket.io-client";
@Injectable({
	providedIn: "root",
})
export class SocketIoService {
	backendURL = "http://localhost:3000";
	private socket: Socket;

	constructor() {
		// Khởi tạo socket với URL server
		this.socket = io("http://localhost:3000/api");
	}

	// Phương thức để lắng nghe sự kiện từ server
	listen(eventName: string): Observable<any> {
		return new Observable((subscriber) => {
			this.socket.on(eventName, (data) => {
				subscriber.next(data);
			});
		});
	}

	// Phương thức để gửi dữ liệu đến server
	emit(eventName: string, data: any): void {
		this.socket.emit(eventName, data);
	}
}
