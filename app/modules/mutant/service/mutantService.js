const mutantModel = require('../model/mutant');
const Dna = require('./Dna');

module.exports.isMutant = async function isMutant(props) {
  let {dna = []} = props;
  const dnaImpl = new Dna(dna);
  let isExists = await mutantModel.findOne({dna: {$eq: [...dna]}}, {isMutant: 1}).lean();
  if (isExists) {
    return {isMutant: isExists.isMutant};
  }
  dnaImpl.horizontalSequence();
  dnaImpl.verticalSequence();
  dnaImpl.diagonalRightSequence();
  dnaImpl.diagonalLeftSequence();
  let res = await dnaImpl.validateMutant();
  let isMutant = Boolean(res.find((i) => i === true));
  await mutantModel.create({dna, isMutant});
  return {isMutant};
};
