import { IMember } from "./profile";

export interface IRequest {
  [key: string]: any;
}

export interface IRpcRequest {
  service: string;
  method: string;
  payload?: Record<string, unknown>;
}

export interface IPaginationParams {
  revision?: number;
  pagination: {
    page: number;
    limit: number;
  };
}

export const enum IResponseStatus {
  SUCCESS = "success",
  FAILURE = "failure",
}

export interface IResponseSuccess<M = IMeta, D = unknown> {
  status: IResponseStatus.SUCCESS;
  meta: M;
  data: D;
}

export interface IResponseFailure {
  status: IResponseStatus.FAILURE;
  code: string;
  messages: string[];
}

export type IResponse = IResponseSuccess | IResponseFailure;

export interface IDocumentFailure {
  status: IResponseStatus.FAILURE;
  code: string;
  messages: string[];
}

export interface IDocumentSuccess {
  status: IResponseStatus.SUCCESS;
  document: {
    type: string;
    filename: string;
    content: string;
  };
}

export type IDocument = IDocumentSuccess | IDocumentFailure;

export interface IMeta {
  who: IMember;
  workspace: {
    id: string;
    name: string;
  } | null;
}

export interface IMetaList extends IMeta {
  revision: number;
  pagination: IPagination;
}

export const enum STATUSES {
  IDLE = "idle",
  PENDING = "pending",
  FULFILLED = "fulfilled",
  REJECTED = "rejected",
}

export interface IPagination {
  current_page: number;
  items_per_page: number;
  total_items: number;
  total_pages: number;
}

export interface ISort {
  sort_by: string;
  direction: -1 | 1;
}

export interface IFileSizeUnit {
  metric: "B" | "Kb" | "Mb" | "Gb" | "Tb" | "Pb" | "Eb" | "Zb" | "Yb";
  binary: "KiB" | "MiB" | "GiB" | "TiB" | "PiB" | "EiB" | "ZiB" | "YiB";
}

export type ILapseUnit = "minute" | "hour" | "day" | "week" | "month" | "year";

export type IReminderType = "email" | "webpush";

export type NonEmptyArr<T> = [T, ...T[]];
export const isNonEmptyArray = <T>(arr: T[]): arr is NonEmptyArr<T> => arr.length > 0;

export interface IPrice {
  amount: number;
  currency: string;
}

export interface IRange {
  startIndex: number;
  endIndex: number;
}

export interface IDatesPeriod {
  from_date: string;
  to_date: string;
}

export interface ITimestamp {
  start: number;
  end: number;
}
