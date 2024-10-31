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

    public override widthTo(width: number): number {
        const duration = super.widthTo(width);
        this.updateHitRadius();
        return duration;
    }

    public override heightTo(height: number): number {
        const duration = super.heightTo(height);
        this.updateHitRadius();
        return duration;
    }

    public isHit(x: number, y: number): number | false {
        const hit = pointInCircle(x, y, this.current.x, this.current.y, this.hitRadius);
        if (!hit) return false;
        return distanceBetween(x, y, this.current.x, this.current.y);
    }

    public isHitPrecise(x: number, y: number): number | false {
        const hit = pointInRotatedRectangle(
            x,
            y,
            this.current.x,
            this.current.y,
            this.current.width,
            this.current.height,
            this.current.rotation
        );
        if (!hit) return false;
        return distanceBetween(x, y, this.current.x, this.current.y);
    }

    private updateHitRadius(): void {
        this.hitRadius = ScreenEntity.HIT_RADIUS_SCALE * (Math.max(this.current.width, this.current.height) / 2);
    }

}