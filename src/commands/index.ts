import * as scg from './scg';
import * as sen from './sen';
import * as obb from './obb';
import * as animation from './animation';
import * as json from './json';
import * as atlas from './atlas';
import * as scripts from './scripts';

export default {
    "sen-helper.scg.decodeAdvanced": scg.decodeAdvanced,
    "sen-helper.scg.encodeAdvanced": scg.encodeAdvanced,
    "sen-helper.scg.decodeSimple": scg.decodeSimple,
    "sen-helper.scg.encodeSimple": scg.encodeSimple,

    "sen-helper.sen.openGUI": sen.openGUI,

    "sen-helper.obb.initProject": obb.initProject,
    "sen-helper.obb.buildProject": obb.buildProject,

    "sen-helper.animation.pamToFlash": animation.pamToFlash,
    "sen-helper.animation.flashToPam": animation.flashToPam,
    "sen-helper.animation.pamToJson": animation.pamToJson,
    "sen-helper.animation.jsonToPam": animation.jsonToPam,

    "sen-helper.json.jsonToRton": json.jsonToRton,
    "sen-helper.json.rtonToJson": json.rtonToJson,

    "sen-helper.atlas.splitResInfoAtlas": atlas.splitResInfoAtlas,
    "sen-helper.atlas.packAtlasResInfo": atlas.packAtlasResInfo,

    "sen-helper.script.decodePlayerData": scripts.decodePlayerData,
    "sen-helper.script.encodePlayerData": scripts.encodePlayerData
};