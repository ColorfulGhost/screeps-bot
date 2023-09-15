import {ErrorMapper} from "utils/ErrorMapper";
import {Harvester} from "creeps/Harvester";

declare global {
  interface Memory {
    uuid: number;
    log: any;
  }

  interface CreepMemory {
    role: string;
    room: string;
    working: boolean;
  }

  namespace NodeJS {
    interface Global {
      log: any;
    }
  }
}
export const loop = ErrorMapper.wrapLoop(() => {

  for (const name in Memory.creeps) {
    // 清理死去的creeps
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
      console.log('Clearing non-existing creep memory:', name);
    }
  }


  const harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvesters');
  // console.log('Harvesters: ' + harvesters.length);
  if (harvesters.length < 4) {
    const name = 'Harvesters' + Game.time;
    Game.spawns['Spawn1'].spawnCreep([WORK, CARRY,MOVE], name)
    if (Game.creeps[name] != null) {
      Game.creeps[name].memory.role = 'harvesters'
    }
  }

  const upGrader = _.filter(Game.creeps, (creep) => creep.memory.role == 'upGrader');
  if (upGrader.length < 5) {
    const name = 'upGrader' + Game.time;

    Game.spawns['Spawn1'].spawnCreep([WORK, CARRY,MOVE], name)
    if (Game.creeps[name] != null) {
      Game.creeps[name].memory.role = 'upGrader'
    }
  }

  for (const creepName in Game.creeps) {
    const creep = Game.creeps[creepName];
    Harvester.run(creep)
  }
});
