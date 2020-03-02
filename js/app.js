const ipInput = document.getElementById('ipInput');
const submit = document.getElementById('submit');
const ipclass = document.getElementById('ipClass');
const subnetMask = document.getElementById('subnetMask');
const hosts = document.getElementById('hosts');
const networkId = document.getElementById('networkId');
const broadCastId = document.getElementById('broadCastId');
const ipBinary = document.getElementById('ipBinary');
const subnetMaskBinary = document.getElementById('subnetMaskBinary');
const hostsBinary = document.getElementById('hostsBinary');
const networkIdBinary = document.getElementById('networkIdBinary');
const broadCastIdBinary = document.getElementById('broadCastIdBinary');


submit.addEventListener('click', ValidateIPaddress);
let arr = [];
let ipClass;

function ValidateIPaddress(e) {

    arr = ipInput.value.split('.');
    ipClass = findClass();
    if (ipInput.value !== '') {
        if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipInput.value)) {
            ipclass.value = ipClass;
            subnetMask.value = findSubnet();
            hosts.value = findHosts();
            networkId.value = findNetworkId();
            broadCastId.value = findBroadCastId();
            ipBinary.value = findBinaryIp();
            subnetMaskBinary.value = findBinarySubnet();
            hostsBinary.value = findHosts().toString(2);
            networkIdBinary.value = findBinaryNetworkId();
            broadCastIdBinary.value = findBinaryBroadCastId();
        } else {
            showAlert('danger', "Invalid Ip Address");
        }
    } else {
        showAlert('warning', "Please, Enter IP Address");
    }
    e.preventDefault();

}

function findClass() {
    let ip = arr[0];
    if (ip >= 1 && ip <= 126)
        return "A";
    else if (ip >= 128 && ip <= 191)
        return "B";
    else if (ip >= 192 && ip <= 223)
        return "C";
    else if (ip >= 224 && ip <= 239)
        return "D";
    else
        return "E"
}

function findSubnet() {
    if (ipClass == "A")
        return '255.0.0.0';
    else if (ipClass == "B")
        return '255.255.0.0';
    else if (ipClass == "C")
        return '255.255.255.0';
    else
        return 'NOT DEFINED';
}

function findHosts() {
    if (ipClass == "A")
        return (Math.pow(2, 24) - 2);
    else if (ipClass == "B")
        return (Math.pow(2, 16) - 2);
    else if (ipClass == "C")
        return (Math.pow(2, 8) - 2);
    else
        return 'NOT DEFINED';

}

function findNetworkId() {
    if (ipClass == "A")
        return (arr[0] + '.0.0.0');
    else if (ipClass == "B")
        return (arr[0] + '.' + arr[1] + '.0.0');
    else if (ipClass == "C")
        return (arr[0] + '.' + arr[1] + '.' + arr[2] + '.0');
    else
        return 'NOT DEFINED';
}

function findBroadCastId() {
    if (ipClass == "A")
        return (arr[0] + '.255.255.255');
    else if (ipClass == "B")
        return (arr[0] + '.' + arr[1] + '.255.255');
    else if (ipClass == "C")
        return (arr[0] + '.' + arr[1] + '.' + arr[2] + '.255');
    else
        return 'NOT DEFINED';
}

function findBinaryIp() {
    return findBinary(arr);
}

function findBinarySubnet() {
    return findBinary(findSubnet().split('.'));

}

function findBinaryNetworkId() {
    return findBinary(findNetworkId().split('.'));
}

function findBinaryBroadCastId() {
    return findBinary(findBroadCastId().split('.'));
}

function findBinary(temp) {
    return (parseInt(temp[0]).toString(2) + '.' + parseInt(temp[1]).toString(2) + '.' + parseInt(temp[2]).toString(2) + '.' + parseInt(temp[3]).toString(2));
}

function showAlert(color, message) {
    const alert = document.getElementById('alert');
    if (!alert.classList.contains(`alert-` + color, 'p-2', 'mb-2', 'text-center')) {
        alert.classList.add(`alert-` + color, 'p-2', 'mb-2', 'text-center');
        alert.innerText = message;
        setTimeout(() => {
            alert.classList.remove(`alert-` + color, 'p-2', 'mb-2', 'text-center');
            alert.innerText = '';
        }, 2000);
    }
}