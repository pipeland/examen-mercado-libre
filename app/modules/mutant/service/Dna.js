/* eslint-disable no-plusplus,for-direction */
const boom = require('@hapi/boom');

class Dna {
  constructor(dna) {
    this.dna = dna;
    this.validateSizeMatrix();
  }

  validateSizeMatrix() {
    let size = this.dna.length;
    if (size === 0 || size <= 3) {
      throw boom.forbidden('mutantService_wrongMatrix');
    }
    for (let i = 0; i < this.dna.length; i++) {
      let validChain = this.dna[i].replace(new RegExp('[ATCG]+'), '');
      if (this.dna[i].length !== size || validChain.length > 0) {
        throw boom.forbidden('mutantService_wrongMatrix');
      }
    }
  }
  /**
   * Return all Rows
   * [
   "A T G C A",
   "C A C T G",
   "T C A T T",
   "C G A A C",
   "C G A A C"
   * ]
   * return:
   * ATGCA CACTG TCATT CGAAC CGAAC
   */
  horizontalSequence() {
    this.horizontal = this.dna.join(' ');
  }
  /**
   * Return all Columns
   * [
     "A T G C A",
     "C A C T G",
     "T C A T T",
     "C G A A C",
     "C G A A C"
   * ]
   * return:
   * ACTCC TACGG GCAAA AGTCC
   */
  verticalSequence() {
    let size = this.dna.length;
    let vertical = [];
    for (let i = 0; i < size; i++) {
      let column = '';
      for (let j = 0; j < size; j++) {
        column += this.dna[j][i];
      }
      vertical = [...vertical, column];
    }
    this.vertical = vertical.join(' ');
  }

  /**
   * Loop through the array from position 0 and character 3 down to the right of the character
   * [
       "A T G C A",
       "C A C T G",
       "T C A T T",
       "C G A A C",
       "C G A A C"
   * ]
   * Iterations:
     *  i = 3
        J = 0; char = 3 = C
        J = 1; char = 2 = C
        J = 2; char = 1 = C
        J = 3; char = 0 = C
     *  i = 4
        J = 0; char = 4 = A
        J = 1; char = 3 = T
        J = 2; char = 2 = A
        J = 3; char = 1 = G
        J = 4; char = 0 = C
     *  i = 5
        J = 0; char = 5 = Does not enter if
        J = 1; char = 4 = G
        J = 2; char = 3 = T
        J = 3; char = 4 = A
        J = 4; char = 4 = G
   * @Return
   * CCCC ATAGC GTAG
   */
  diagonalLeftSequence() {
    let size = this.dna.length;
    let diagonal = [];
    for (let i = 3; i < (size * 2) - 4; i++) {
      let vertical = '';
      for (let j = 0; j < size; j++) {
        let char = i - j;
        if (char >= 0 && char < size) {
          vertical += this.dna[j][char];
        }
      }
      diagonal = [...diagonal, vertical];
    }
    this.diagonalLeft = diagonal.join(' ');
  }
  /**
   *Loops through the array from position 0 and 3 characters before end to left
   * [
       "A T G C G A",
       "C G G T G C",
       "T T A T A T",
       "A G A A G G",
       "C G C C T A",
       "T C A C T G"
   ]
   * Iterations:
   *  i = -2
       J = 0; char = 2 = G
       J = 1; char = 3 = T
       J = 2; char = 4 = A
       J = 3; char = 5 = G
   *  i = -1
       J = 0; char = 1 = T
       J = 1; char = 2 = G
       J = 2; char = 3 = T
       J = 3; char = 4 = G
       J = 4; char = 5 = A
   *  i = 0
       J = 0; char = 0 = A
       J = 1; char = 1 = G
       J = 2; char = 2 = A
       J = 3; char = 3 = A
       J = 4; char = 4 = T
       J = 5; char = 5 = G
   *  i = -1
       J = 0; char = -1 = Does not enter if
       J = 1; char = 0 = C
       J = 2; char = 1 = T
       J = 3; char = 2 = A
       J = 4; char = 3 = C
       J = 5; char = 4 = T
   * @Return
   * GTAG TGTGA AGAATG CTACT TGCC
   */
  diagonalRightSequence() {
    let size = this.dna.length;
    let diagonal = [];
    for (let i = (3 - (size - 1)); i < (size - 3); i++) {
      let vertical = '';
      for (let j = 0; j < (size); j++) {
        let char = j - i;
        if (char >= 0 && char < size) {
          vertical += this.dna[j][char];
        }
      }
      diagonal = [...diagonal, vertical];
    }
    this.diagonalRigth = diagonal.join(' ');
  }
  /**
   * Returns true or false for:
   * Horizontal
   * vertical
   * diagonal left
   * diagonal right
   * @returns [true, false, true, false]
   */
  validateMutant() {
    return Promise.all([this.regexFunction(this.horizontal), this.regexFunction(this.vertical),
      this.regexFunction(this.diagonalLeft), this.regexFunction(this.diagonalRigth)]);
  }
  /**
   * Validate that there are 3 characters from the first match
   * [TGCA] valid characters
   * \1 From the first coincidence
   * {3} Three characters from the first match
   * @param dna
   * @return true or false
   */
  regexFunction(dna) {
    return new Promise((resolve) => {
      resolve(new RegExp('([TGCA])\\1{3}').test(dna));
    });
  }
}

module.exports = Dna;
