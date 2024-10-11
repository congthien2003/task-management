export interface Attachment {
	fileName: { type: String; required: true };
	fileUrl: { type: String; required: true };
	fileType: { type: String };
}
