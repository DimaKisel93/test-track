export interface TestData {
  title: string;
  dev: {
    front: number;
    back: number;
    db: number;
  };
  test: {
    front: number;
    back: number;
    db: number;
  };
  prod: {
    front: number;
    back: number;
    db: number;
  };
  norm: number;
}

export interface InstanceData {
  front: number;
  back: number;
  db: number;
}

export type Instances = "dev" | "test" | "prod";
