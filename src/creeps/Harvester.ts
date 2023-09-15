import {log} from "../utils/utils";

export default class Harvester {
  public static run(creep: Creep): void {
    if (creep.store.getFreeCapacity() > 0) {
      const sources = creep.room.find(FIND_SOURCES);
      if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        console.log("move" + creep.name + "to" + sources[0].pos)
        creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffffff'}});
      }
    } else {

      const controller = creep.room.controller;
      if (controller != null && creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(controller);
      }


      for (let spawnName in Game.spawns) {
        if (creep.transfer(Game.spawns[spawnName], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(Game.spawns[spawnName]);
        }
      }
    }
  }
}
