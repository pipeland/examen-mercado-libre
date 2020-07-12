const mutantModel = require('../../mutant/model/mutant');

module.exports.getStats = async function getStats() {
 let count = await mutantModel.aggregate([
    {
      $group: {_id: '$isMutant', total: {$sum: 1}}
    }
  ]);
 let mutantDna = count.find((i) => (i._id === true)) || {total: 0};
 let humanDna = count.find((i) => (i._id === false)) || {total: 0};
 let ratio = humanDna.total === 0 ? mutantDna.total : mutantDna.total / humanDna.total;
  return {'count_mutant_dna': mutantDna.total, 'count_human_dna': humanDna.total, ratio: ratio > 0 ? ratio.toFixed(2) : ratio};
};
