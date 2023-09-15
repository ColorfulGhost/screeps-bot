import Harvester from "./Harvester";

export class CreepExtension extends Creep {

  public work() {
    // 清理死去的creeps
    if (!(this.name in Game.creeps)) {
      delete Memory.creeps[this.name];
    }
    // 还没出生就啥都不干
    if (this.spawning) {
      if (this.ticksToLive === CREEP_LIFE_TIME) this._id = this.id // 解决 this creep not exist 问题
      return
    }
    Harvester.run(this);
  }
}
