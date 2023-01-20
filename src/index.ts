import { NetworkTables, NetworkTableTypeInfos } from "ntcore-ts-client";

console.log("Starting Network Tables 4 example");

// Create NetworkTable Instance and topics for pub/sub
const nt = NetworkTables.createInstanceByURI("localhost", 5810);
const pubTopic = nt.createTopic<number>('Romi/SecondsFromStart', NetworkTableTypeInfos.kInteger);
const subTopic = nt.createTopic<number>('/FMSInfo/MatchNumber', NetworkTableTypeInfos.kInteger);

// Subscribe callback
subTopic.subscribe( (val) => {
    console.log('MatchNumber = ' + val);
},true);


// Publish loop
pubTopic.publish();
let sec = 0;
setInterval( () => {
    pubTopic.setValue(sec);
    console.log('Sec value = ' + sec);
    sec++;
}, 1000);


