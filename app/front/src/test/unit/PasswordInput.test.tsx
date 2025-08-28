import '@testing-library/jest-dom';
import {fireEvent, render,screen, waitFor} from '@testing-library/react'
import { PasswordInput } from '@/components/forms/passwordInput'
import React from 'react'

describe("PasswordInput",()=>{
    const mockRefPassword: React.RefObject<HTMLInputElement | null> = {
      current: {
        value: 'senha123',
        focus: jest.fn(),
      } as unknown as HTMLInputElement,
    };

    it("Should hide the input caracters",async()=>{
      render(<PasswordInput id="password" placeholder={"Digite sua senha"} refPassword={mockRefPassword}/>)
      const input = screen.getByPlaceholderText("Digite sua senha") as HTMLInputElement
      const eye = screen.getByTestId('eye')
      const eyeOn = screen.queryByTestId("eyeon")
      const eyeOff = screen.queryByTestId("eyeoff")

      fireEvent.change(input, { target: { value: 'senha1234' } });
      
      expect(input.type).toEqual('password')
      expect(eyeOff).toBeNull()
      expect(eyeOn).toBeVisible()
      expect(input).toHaveValue('senha1234')

      
      fireEvent.click(eye)
      expect(input.type).toEqual('text')
      expect(input).toHaveValue('senha1234')

      await waitFor(()=>{
        expect(screen.queryByTestId("eyeoff")).toBeVisible()
        expect(screen.queryByTestId("eyeon")).toBeNull()
      })
    })
})