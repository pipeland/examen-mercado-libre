const mutantModel = require('../model/mutant');
const Dna = require('./Dna');

module.exports.isMutant = async function isMutant(props) {
  let {dna = []} = props;
  const dnaImpl = new Dna(dna);
  dnaImpl.horizontalSequence();
  dnaImpl.verticalSequence();
  dnaImpl.diagonalRightSequence();
  dnaImpl.diagonalLeftSequence();
  let res = await dnaImpl.validateMutant();
  let isMutant = Boolean(res.find((i) => i === true));
  await mutantModel.create({dna, isMutant});
  return {isMutant};
};
