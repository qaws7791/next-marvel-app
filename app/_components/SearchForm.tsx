'use client'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const SearchFormSchema = z.object({
  search: z.string().min(2, 'Too Short').max(20, 'Too Long'),
})

type SearchFormSchema = z.infer<typeof SearchFormSchema>

const defaultValues: SearchFormSchema = {
  search: '',
}

const SearchForm = () => {
  const router = useRouter()

  const form = useForm<SearchFormSchema>({
    resolver: zodResolver(SearchFormSchema),
    defaultValues,
    mode: 'onChange',
  })

  const onSubmit = (data: SearchFormSchema) => {
    router.push(`/search/${data.search}`)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      form.handleSubmit(onSubmit)()
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='search'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='sr-only'>Character Name: </FormLabel>
              <FormControl>
                <Input
                  placeholder='Search'
                  className='w-full'
                  onKeyDown={handleKeyDown}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Enter a character name to find it in the Marvel Universe
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

export default SearchForm
