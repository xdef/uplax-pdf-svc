import { IMeta, IResponseFailure, IResponseSuccess } from "./global";

export interface IAttachment {
  id: string;
  url: string;
  metadata: {
    filename: string;
    size: number;
    mime_type: string;
    width?: number;
    height?: number;
  };
}

export interface IAttachmentEntity extends Omit<IAttachment, "url"> {
  data: Blob;
}

export type IAttachmentResponseSuccess = IResponseSuccess<IMeta, IAttachment>;
export type IAttachmentResponse = IAttachmentResponseSuccess | IResponseFailure;

export type IAttachmentsResponseSuccess = IResponseSuccess<IMeta, IAttachment[]>;
export type IAttachmentsResponse = IAttachmentsResponseSuccess | IResponseFailure;
