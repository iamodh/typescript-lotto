import { Console } from '@woowacourse/mission-utils';
import PRIZE_CONFIG from '../constants/prizeConfig.js';
import Lotto from '../models/domains/Lotto.js';
import { WinningStatistic } from '../types/lotto.js';

class OutputView {
  printPurchasedLottos(lottos: Lotto[]) {
    Console.print(`${lottos.length}개를 구매했습니다.`);
    for (const lotto of lottos) {
      const sortedNumbers = this.#sortLottoNumbers(lotto.getNumbers());
      Console.print(`[${sortedNumbers.join(', ')}]`);
    }
  }

  #sortLottoNumbers(numbers: number[]) {
    return numbers.sort((a, b) => a - b);
  }

  printWinningStatistic(winningStatistic: WinningStatistic) {
    Console.print('당첨 통계');
    Console.print('---');

    for (let rank = PRIZE_CONFIG.COUNT; rank >= 1; rank--) {
      const condition = PRIZE_CONFIG.CONDITION[rank];
      const money = PRIZE_CONFIG.MONEY[rank].toLocaleString();
      const count = winningStatistic[rank].length;

      Console.print(`${condition} (${money}원) - ${count}개`);
    }
  }

  printProfitRate(profitRate: number) {
    Console.print(`총 수익률은 ${profitRate}%입니다.`);
  }

  printErrorMessage(errorMessage: string) {
    Console.print(errorMessage);
  }

  printNewLine() {
    Console.print('');
  }
}

export default OutputView;
