export interface Trailer {
  readonly id: number;
  name: string;
  preview: string;
  data: {
    480: string;
    max: string;
  };
}

export interface TrailerDetails extends Trailer {
  description?: string;
  duration?: number;
  created_at?: string;
  updated_at?: string;
}

export default Trailer;
