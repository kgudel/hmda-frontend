import React, { useEffect, useState } from 'react'
import { PRODUCT_NAMES } from '../constants/publication-changes'
import spyGlass from '../../common/images/cf-gov-search.svg'
import './FilterBar.css'

/**
 * UI to adjust Filter criteria
 * (default export)
 */
const PublicationFilterBar = ({
  productOptions,
  typeOptions,
  filter,
}) => {
  return (
    <div id='filter-bar'>
      <div className='filter-wrapper split'>
        <FilterColumn
          name='type'
          heading='by Change Type'
          options={typeOptions}
          filter={filter}
        />
        <FilterColumn
          name='product'
          heading='by Product'
          options={productOptions}
          filter={filter}
        />
        <div className='search-wrapper'>
          <h3><label htmlFor='keyword-input'>by Change Description</label></h3>
          <div className='text-input'>
            <span className='icon'><img src={spyGlass} alt='Magnifying glass'/></span>
            <div className='keyword-input-wrapper'>
              <input
                id='keyword-input'
                type='text'
                value={filter.filters.keywords ? filter.filters.keywords.join(' ') : ''}
                onChange={(e) => filter.add('keywords', e.target.value)}
                placeholder='Enter terms to search'
              />
              <button type='button' className='clear-text' onClick={() => filter.clear('keywords')}>x</button>
            </div>
            <button
              className='reset-filters'
              onClick={() => filter.clear()}
              type="button"
            >       
              Reset All Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


const FilterColumn = ({ name, options, heading, filter }) => (
  <div className={`pills-wrapper ${name}`}>
    <h3>{heading}</h3>
    <div className='pills split columns'>
      {options.map((option, idx) => (
        <FilterPill
          key={`${option.type}-${idx}`}
          option={option}
          filter={filter}
        />
      ))}
    </div>
  </div>
)


/** Option that toggles it's filter when clicked */
const FilterPill = ({ option, filter }) => {
  const { type, value } = option
  const { toggle, filters } = filter
  const id = `pill-${type}-${value}`
  const map = type === 'product' ? PRODUCT_NAMES : null
  const mappedVal = map ? map[value] : value
  const selected = filters[option.type].indexOf(option.value) > -1 
    ? 'selected' 
    : ''
  const [wasClicked, setWasClicked] = useState(false)

  // Scroll to page top on initial load
  useEffect(() => window.scrollTo(0, 0), [])

  // Keep Filter Bar in view on filter change
  useEffect(() => {
    if (wasClicked) {
      document.getElementById('pub-whats-new').scrollIntoView()
      setWasClicked(false)
    }
  }, [wasClicked])

  return (
    <button
      id={id}
      className={`pill ${type} ${value} ${selected}`}
      onClick={() => {
        toggle(type, value)
        setWasClicked(!wasClicked)
      }}
      tabIndex="0"
      type="button"
    >
      <div className='text'>{mappedVal}</div>
    </button>
  )
}


export default PublicationFilterBar
