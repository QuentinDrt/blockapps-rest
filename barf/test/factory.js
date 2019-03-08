import rest from '../rest_7'
import util from '../util'
import fsUtil from '../fsUtil'
import ip from 'ip'

const publicKey = '6d8a80d14311c39f35f516fa664deaaaa13e85b2f7493f37f6144d86991ec012937307647bd3b9a82abe2974e1407241d54947bbb39763a4cac9f77166ad92a0';
const port = 30303;
const localIp = ip.address();
const enode = `enode://${publicKey}@${localIp}:${port}`
const balance = 100000000000000000000;

/*
  users
 */
async function createAdmin(uid, options, password = '1234') {
  const username = `admin_${uid}`
  const args = { username, password }
  const user = await rest.createUser(args, options)
  return user
}

function createContractArgs(uid, args = {}) {
  const name = `TestContract_${uid}`
  const source = `contract ${name} { }`
  return { name, source, args: util.usc(args) } // TODO flow contractArgs object
}

function createContractSyntaxErrorArgs(uid, args = {}) {
  const name = `TestContract_${uid}`
  const source = `contract ${name} { zzz zzz }`
  return { name, source, args: util.usc(args) } // TODO flow contractArgs object
}

function createContractConstructorArgs(uid, args = {}) {
  const name = `TestContract_${uid}`
  const source = `
contract ${name} {
  uint var_uint;
  constructor(uint _arg_uint) {
    var_uint = _arg_uint;
  }   
}
`
  return { name, source, args: util.usc(args) } // TODO flow contractArgs object
}

async function createContractFromFile(filename, uid, constructorArgs) {
  const name = `TestContract_${uid}`
  const source = fsUtil.get(filename).replace('TestContract', name)
  return { name, source, args: util.usc(constructorArgs) } // TODO flow contractArgs object
}

function createSendTxArgs(toAddress, value = 10) {
  return { value, toAddress }
}

function createSendTxArgsArr(toAddress, value = 10, count = 2) {
  let sendTxs = [];

  for (let i = 0; i < count; i++) {
    sendTxs.push({ value: value + i, toAddress })
  }

  return sendTxs;
}

function createCallMethodArgs(contract, args, method = 'multiply') {
  return {
    contractName: contract.name,
    contractAddress: contract.address,
    method,
    args
  }
}

function createCallMethodArgsArr(contract, args, method = 'multiply', count = 2) {
  let callMethodArgs = [];

  for (let i = 0; i < count; i++) {
    callMethodArgs.push({
      contractName: contract.name,
      contractAddress: contract.address,
      method,
      args
    })
  }

  return callMethodArgs;
}

const createChainArgs = (members) => {
  const memberList = members.map((address) => { return ({ address: address, enode }) });
  const balanceList = members.map((address) => { return ({ address: address, balance }) });

  const chain = {
    label: `airline-${util.uid()}`,
    src: 'contract Governance { }',
    args: {},
    members: memberList,
    balances: balanceList
  }

  return (
    chain
  )
}

export default {
  createAdmin,
  createContractArgs,
  createContractSyntaxErrorArgs,
  createContractConstructorArgs,
  createContractFromFile,
  createSendTxArgs,
  createSendTxArgsArr,
  createCallMethodArgs,
  createCallMethodArgsArr,
  createChainArgs
}
