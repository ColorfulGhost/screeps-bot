export class Harvester {
  public static run(creep: Creep) {

    if (creep.store.getFreeCapacity() > 0) {
      const sources = creep.room.find(FIND_SOURCES);
      if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        console.log("move" + creep.name + "to" + sources[0].pos)
        creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffffff'}});
      }
    } else {

      let findTarget = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          (structure.structureType == STRUCTURE_SPAWN ||
            structure.structureType == STRUCTURE_CONTAINER ||
            structure.structureType == STRUCTURE_TOWER) &&
          structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
        }
      });
      let findTargetElement = findTarget[0];
      console.log(creep.name + " GoTo " +findTargetElement)
      creep.moveTo(findTargetElement, {visualizePathStyle: {stroke: '#6dff00'}});
    }
  }
}
