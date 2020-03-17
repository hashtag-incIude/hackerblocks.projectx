import Controller from '@ember/controller';
import { action, computed } from '@ember/object';
import {inject as service} from '@ember/service';

export default class ContestController extends Controller {
  @service store

  queryParams = ['offset', 'limit', 'difficulty', 'status', 'tags', 'q']
  offset = 0
  limit = 10
  difficulty = []
  status = null
  tags = []
  q = ''

  @computed('offset', 'limit')
  get page() {
    return {
      offset: this.offset,
      limit: this.limit
    }
  }
  @computed('status','difficulty','tags', 'q')
  get filter() {
    return {
      status: this.status,
      difficulty: {
        $in: this.difficulty
      },
      tags: {
        id: {
          $in: this.tags
        }
      },
      name: {
        $iLike: `%${this.q}%`
      }
    }
  }
  
  @action
  setOffset(offset) {
    this.set('offset', offset)
  }
}
