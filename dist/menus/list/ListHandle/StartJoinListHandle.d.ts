import { Exec, HandlerListOptions, ListHandle } from './ListHandle';
export default class StartJoinListHandle extends ListHandle implements Exec {
    constructor(options: HandlerListOptions);
    exec(): void;
}
