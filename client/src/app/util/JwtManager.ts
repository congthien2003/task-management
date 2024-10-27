import * as CryptoJS from "crypto-js";
import { secretKeyToken } from "../core/constaint/secret";
export class JwtManager {
	encryptToken(token: string): string {
		const encryptedToken = CryptoJS.AES.encrypt(
			token,
			secretKeyToken
		).toString();
		return encryptedToken;
	}

	decryptToken(token: string): string {
		// Giải mã token
		const bytes = CryptoJS.AES.decrypt(token, secretKeyToken);
		const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);
		return decryptedToken;
	}

	getToken(): string {
		const token = localStorage.getItem("token") ?? "";

		return token ?? "";
	}

	setToken(token: string): void {
		localStorage.setItem("token", token);
	}
}
