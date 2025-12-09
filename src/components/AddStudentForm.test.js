import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'

import AddStudentForm from './AddStudentForm.vue'

describe('AddStudentForm', () => {

    it('renders the form', () => {
        const wrapper = mount(AddStudentForm)

        expect(wrapper.find('form').exists()).toBe(true)
    })

    it('has name and age inputs', () => {
        const wrapper = mount(AddStudentForm)

        const inputs = wrapper.findAll('input')

        expect(inputs).toHaveLength(2)
    })

    it('has a submit button', () => {
        const wrapper = mount(AddStudentForm)

        const button = wrapper.find('button[type="submit"]')

        expect(button.exists()).toBe(true)

        expect(button.text()).toBe('Add student')
    })

    it('emits add-student event when form is submitted', async () => {
        const wrapper = mount(AddStudentForm)

        const nameInput = wrapper.findAll('input')[0]
        const ageInput = wrapper.findAll('input')[1]

        await nameInput.setValue('John Doe')
        await ageInput.setValue('25')

        await wrapper.find('form').trigger('submit.prevent')

        expect(wrapper.emitted()).toHaveProperty('add-student')

        const emittedData = wrapper.emitted('add-student')[0][0]
        expect(emittedData).toEqual({ name: 'John Doe', age: 25 })
    })
})
