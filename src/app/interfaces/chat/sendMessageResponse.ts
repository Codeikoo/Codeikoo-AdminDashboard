export interface SendMessageApiResponse {
  message: {
    createdById: string;
    receiverId: string;
    message: string;
    createdDate: Date | string;
  };
  isSuccess: boolean;
  errorCode: string;
  errors: string[];
}
