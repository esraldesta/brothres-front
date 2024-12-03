'use client'

import { Languages } from '@/constants';
import React, { useState } from 'react'
import { TfiWorld } from 'react-icons/tfi';

export default function SelectLang() {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedLanguage(e.target.value);
  }
    return (

        <div className="max-md:hidden px-2 py-2.5 bg-button flex items-center gap-1 mr-4 h-10 cursor-pointer rounded-lg">
            <TfiWorld className="w-4 h-3" />
            <select
                value={selectedLanguage}
                onChange={handleChange}
                className="bg-button focus-visible:outline-none text-sm"
            >
                {Languages.map((language) => {
                    return (
                        <option
                            key={language}
                            value={language}
                            className="text-sm p-2 w-full"
                        >
                            {language}
                        </option>
                    );
                })}
            </select>
        </div>
    )
}
