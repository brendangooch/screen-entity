/**
 * a dynamic rectangle + collision detection + zIndex
 */

import { DynamicRectangle } from "@brendangooch/dynamic-objects";
import { pointInCircle, pointInRotatedRectangle } from "@brendangooch/collision-detection";
import { distanceBetween } from "@brendangooch/maths";

export class ScreenEntity extends DynamicRectangle {

    // 1.0 matches width or height of entity, whichever is greatest
    public static HIT_RADIUS_SCALE: number = 0.8;

    private zIndex: number = 1;
    private hitRadius: number = 1;

    public get z(): number {
        return this.zIndex;
    }

    public set z(zIndex: number) {
        this.zIndex = zIndex;
    }

    public updateHitRadius(): void {
        this.hitRadius = ScreenEntity.HIT_RADIUS_SCALE * (Math.max(this.width.current, this.height.current) / 2);
    }

    public isHit(x: number, y: number): number {
        const hit = pointInCircle(x, y, this.position.x, this.position.y, this.hitRadius);
        if (!hit) return -1;
        return distanceBetween(x, y, this.position.x, this.position.y);
    }

    public isHitPrecise(x: number, y: number): number {
        const hit = pointInRotatedRectangle(
            x,
            y,
            this.position.x,
            this.position.y,
            this.width.current,
            this.height.current,
            this.rotation.current
        );
        if (!hit) return -1;
        return distanceBetween(x, y, this.position.x, this.position.y);
    }


}