import Vue from 'vue'
import Vuex from 'vuex'
import cloneDeep from 'lodash/cloneDeep'
import { options } from '../../../../src/store'
import Notes from '../../../../src/components/Notes'

describe('Notes', () => {
  let testOptions

  beforeEach(() => {
    testOptions = cloneDeep(options)
  })

  xit('has the correct name', () => {
    expect(Notes.name).toBe('notes')
  })

  xit('calls action when setting order', (done) => {
    sinon.stub(testOptions.actions, 'updateNotesOrder').callsFake(({ commit }) => {
      done()
    })
    const stubbedStore = new Vuex.Store(testOptions)
    const mixin = {
      mounted () {
        Vue.nextTick(() => {
          this.setNotesOrder()
        })
      }
    }
    const Component = Vue.extend({ ...Notes, store: stubbedStore, mixins: [mixin] })
    new Component().$mount()
  })

  xit('sets notes order correctly', (done) => {
    const TEST_KEY_A = 'A'
    const TEST_KEY_B = 'B'
    sinon.stub(testOptions.actions, 'updateNotesOrder').callsFake(({ commit }, order) => {
      assertions(order)
    })
    function assertions (order) {
      expect(order[TEST_KEY_A]).toBe(2)
      expect(order[TEST_KEY_B]).toBe(1)
      done()
    }
    testOptions.state.notes = [
      {
        '.key': TEST_KEY_A,
        checked: false,
        color: '',
        created_at: '',
        markdown: false,
        text: '',
        title: ''
      },
      {
        '.key': TEST_KEY_B,
        checked: false,
        color: '',
        created_at: '',
        markdown: false,
        text: '',
        title: ''
      }
    ]
    testOptions.state.notesOrder = {
      [TEST_KEY_A]: 1,
      [TEST_KEY_B]: 2
    }
    testOptions.mutations.changeOrder = function changeOrder (state) {
      state.notesOrder = {
        [TEST_KEY_A]: 2,
        [TEST_KEY_B]: 1
      }
    }
    const stubbedStore = new Vuex.Store(testOptions)
    const mixin = {
      mounted () {
        this.$store.commxit('changeOrder')
      },
      updated () {
        this.setNotesOrder()
      }
    }
    const Component = Vue.extend({ ...Notes, store: stubbedStore, mixins: [mixin] })
    new Component().$mount()
  })
})
