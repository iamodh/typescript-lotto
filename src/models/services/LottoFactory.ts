import { Random } from '@woowacourse/mission-utils';
import LOTTO_CONFIG from '../../constants/lottoConfig.js';
import Lotto from '../domains/Lotto.js';

class LottoFactory {
  public purchaseLottos(purchasePrice: number) {
    const quantity = purchasePrice / LOTTO_CONFIG.PRICE;
    const lottos: Lotto[] = [];
    for (let i = 0; i < quantity; i++) {
      const randomNumbers = this.getRandomLottoNumbers();

      lottos.push(new Lotto(randomNumbers));
    }

    return lottos;
  }

  private getRandomLottoNumbers(): number[] {
    return Random.pickUniqueNumbersInRange(
      LOTTO_CONFIG.NUMBER_RANGE_FROM,
      LOTTO_CONFIG.NUMBER_RANGE_TO,
      LOTTO_CONFIG.NUMBERS_COUNT
    );
  }
}

export default LottoFactory;
