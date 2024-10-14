export interface Widget {
    type: string,
    projectId: number,
    height: number,
    width: number,
    position?: { x: number; y: number } 
}
export const DEFAULT_HEIGHT = 350;
export const DEFAULT_WIDTH = 500;