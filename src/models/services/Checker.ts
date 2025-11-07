import PRIZE_CONFIG from '../../constants/prizeConfig.js';
import { WinningStatistic } from '../../types/lotto.js';
import Lotto from '../domains/Lotto.js';
import WinningLotto from '../domains/WinningLotto.js';

class Checker {
  public checkWinningStatistic(lottos: Lotto[], winningLotto: WinningLotto) {
    const winningStatistic: WinningStatistic = {};

    for (let rank = 1; rank <= PRIZE_CONFIG.COUNT; rank++) {
      winningStatistic[rank] = [];
    }

    for (const lotto of lottos) {
      const rank = this.checkRank(lotto, winningLotto);

      if (rank !== null && rank <= PRIZE_CONFIG.COUNT) {
        const numbers = lotto.getNumbers();

        winningStatistic[rank].push(numbers);
      }
    }

    return winningStatistic;
  }

  private checkRank(lotto: Lotto, winningLotto: WinningLotto) {
    const targetNumbers = lotto.getNumbers();
    const winningNumbers = winningLotto.getNumbers();
    const bonusNumber = winningLotto.getBonusNumber();

    const intersectoinCounts = this.getIntersectionCounts(
      targetNumbers,
      winningNumbers
    );

    switch (intersectoinCounts) {
      case 6:
        return 1;
      case 5: {
        if (targetNumbers.includes(bonusNumber)) {
          return 2;
        }
        return 3;
      }
      case 4:
        return 4;
      case 3:
        return 5;
      default:
        return null;
    }
  }

  private getIntersectionCounts(numsA: number[], numsB: number[]) {
    const totalCounts = numsA.length + numsB.length;
    const unionCounts = new Set([...numsA, ...numsB]).size;

    return totalCounts - unionCounts;
  }
}

export default Checker;
