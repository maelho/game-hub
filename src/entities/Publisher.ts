export interface Publisher {
  readonly id: number;
  name: string;
  slug: string;
  games_count?: number;
  image_background?: string;
  description?: string;
}

export interface PublisherDetails extends Publisher {
  description: string;
  games_count: number;
}

export default Publisher;
