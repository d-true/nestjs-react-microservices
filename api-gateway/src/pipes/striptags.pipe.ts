import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';

import * as striptags from 'striptags';

@Injectable()
export class StriptagsPipe implements PipeTransform {
    private isObj(obj: unknown): boolean {
        return typeof obj === 'object' && obj !== null;
    }

    private striptags(values: unknown) {
        if (typeof values !== 'object' || values === null) {
            return values;
        }

        Object.keys(values).forEach((key) => {
            if (this.isObj(values[key])) {
                this.striptags(values[key]);
            } else if (typeof values[key] === 'string') {
                values[key] = striptags(values[key]);
            }
        });
        return values;
    }

    transform(values: unknown, metadata: ArgumentMetadata) {
        const { type } = metadata;
        if (this.isObj(values) && type === 'body') {
            return this.striptags(values);
        }

        return values;
    }
}
