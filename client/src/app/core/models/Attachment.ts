export interface Attachment {
	_id: string;
	fileName: string;
	filePath: string;
	fileType: string;
	createAt: Date;
	updateAt: Date;
	taskId: string;
}
