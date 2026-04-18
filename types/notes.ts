import { IAttachment } from "./attachments";

import {
  IMeta,
  IMetaList,
  IResponseFailure,
  IResponseSuccess,
  ITimestamp,
  STATUSES,
} from "./global";

export interface INote {
  id: string;
  created_at: string;
  updated_at: string;
  transcriptions_status: STATUSES;
  transcriptions_started_at: string | null;
  transcriptions_ended_at: string | null;
  summarizations_status: STATUSES;
  summarizations_started_at: string | null;
  summarizations_ended_at: string | null;
  attachments: IAttachment[];
  summarizations: INoteSummarization[];
  transcriptions: INoteTranscription[];
}

export interface INoteTranscription {
  attachment_id: string;
  segments: INoteTranscriptionSegment[];
}

export interface INoteTranscriptionSegment {
  start: number;
  end: number;
  text: string;
  speaker: string;
}

export interface INoteSummarization {
  attachment_id: string;
  title: string;
  details: string;
  topics: {
    title: string;
    details: string;
    participants: string[];
    timestamp: ITimestamp;
  }[];
  actions: {
    due_date: string | null;
    title: string;
    details: string | null;
    participants: string[];
    timestamp: ITimestamp;
  }[];
  participants: {
    name: string;
    role: string | null;
    details: string;
    keywords: string[];
  }[];
}

export interface INoteCreateParams extends Record<string, unknown> {
  attachments: Pick<IAttachment, "id">[];
}

export type INoteResponseSuccess = IResponseSuccess<IMeta, INote>;
export type INoteResponse = INoteResponseSuccess | IResponseFailure;

export type INotesResponseSuccess = IResponseSuccess<IMetaList, INote[]>;
export type INotesResponse = INotesResponseSuccess | IResponseFailure;
