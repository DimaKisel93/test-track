export interface TestData {
  title: string;
  dev: SiteAnalysisData;
  test: SiteAnalysisData;
  prod: SiteAnalysisData;
  norm: number;
}

export interface SiteAnalysisData {
  front: number;
  back: number;
  db: number;
}

export type Instances = 'dev' | 'test' | 'prod';
