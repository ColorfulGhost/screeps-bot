import {ErrorMapper} from "utils/ErrorMapper";
import Harvester from "./creeps/Harvester";


export const loop = ErrorMapper.wrapLoop(() => {

  const harvester = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
  if (harvester.length < 3) {
    const name = 'harvester';
    for (let spawnName in Game.spawns) {
      let spawn = Game.spawns[spawnName];
      let spawnCreep = spawn.spawnCreep([WORK, CARRY, MOVE], name + "-" + spawnName + "-" + Game.time);
      if (spawnCreep == OK) {
        Game.creeps[name].memory.role = "harvester"
        break;
      }
    }
  }

  const upgrader = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
  if (upgrader.length < 3) {
    const name = 'upgrader';
    for (let spawnName in Game.spawns) {
      let spawn = Game.spawns[spawnName];
      let spawnCreep = spawn.spawnCreep([WORK, CARRY, MOVE], name + "-" + spawnName + "-" + Game.time);
      if (spawnCreep == OK) {
        Game.creeps[name].memory.role = "upgrader"
        break;
      }
    }
  }

  for (const creepName in Game.creeps) {
    const creep = Game.creeps[creepName];
    // 清理死去的creeps
    if (!(creep.name in Game.creeps)) {
      delete Memory.creeps[creep.name];
    }
    // 还没出生就啥都不干
    if (creep.spawning) {
      if (creep.ticksToLive === CREEP_LIFE_TIME) creep._id = creep.id // 解决 this creep not exist 问题
      return
    }
    Harvester.run(creep);
  }
});
