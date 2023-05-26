import React, {memo, useState, useEffect} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Pagination({pageCount, activePage, setActivePage}) {
	const cn = bem('Pagination');
	
	const [idItem, setIdItem] = useState('1')
	
	// Сброс цвета кнопки переключения предыдущей страницы
	function styleItem(e) {
		setIdItem(e.target.id)
		try {
			if (activePage !== e.target.id) {
				document.getElementById(`${activePage}`).style.backgroundColor = '#FFFFFF';
				document.getElementById(`${activePage}`).style.color = '#000000';
			} else {
				document.getElementById(`${idItem}`).style.backgroundColor = '#0087E9';
				document.getElementById(`${activePage}`).style.color = '#FFFFFF';
			}
		} catch (e) {
		}
	}
	
	// Функция создания пагинации
	function showPagination() {
		const addPagination = (count, first) => {
			return Array.from({length: count}, (e, i) => i).map((i) =>
				(<div id={first + i} key={first + i} className={cn('item')} onClick={(e) => {
					setActivePage(first + i);
					styleItem(e);
				}
				}
				>{first + i}</div>))
		}
		
		const ellipsis = () => {
			return <div className={cn('ellipsis')}>...</div>
		}
		
		if (pageCount < 6) {
			return addPagination(pageCount, 1)
		} else {
			if (activePage === 1 || activePage === 2) {
				return <>
					{addPagination(3, 1)}
					{ellipsis()}
					{addPagination(1, pageCount)}
				</>
			} else if (activePage === pageCount || activePage === pageCount - 1) {
				return <>
					{addPagination(1, 1)}
					{ellipsis()}
					{addPagination(3, (pageCount - 2))}
				</>
			} else if (activePage === 3) {
				return <>
					{addPagination(4, 1)}
					{ellipsis()}
					{addPagination(1, pageCount)}
				</>
			} else if (activePage === (pageCount - 2)) {
				return <>
					{addPagination(1, 1)}
					{ellipsis()}
					{addPagination(4, (pageCount - 3))}
				</>
			} else if (activePage >= 4 || activePage < (pageCount - 3)) {
				return <>
					{addPagination(1, 1)}
					{ellipsis()}
					{addPagination(3, (activePage - 1))}
					{ellipsis()}
					{addPagination(1, pageCount)}
				</>
			}
		}
	}
	
	// Установка цвета кнопки активной страницы
	useEffect(() => {
		try {
			document.getElementById(`${idItem}`).style.backgroundColor = '#0087E9';
			document.getElementById(`${activePage}`).style.color = '#FFFFFF';
		} catch (e) {
		}
	})
	useEffect(() => {
		try {
			document.getElementById(`${idItem}`).style.backgroundColor = '#0087E9';
			document.getElementById(`${activePage}`).style.color = '#FFFFFF';
		} catch (e) {
		}
	}, [idItem])
	
	return (
		<div className={cn()}>
			{showPagination()}
		</div>
	)
}

Pagination.propTypes = {
	pageCount: propTypes.number.isRequired,
	activePage: propTypes.number.isRequired,
	setActivePage: propTypes.func.isRequired,
}

Pagination.defaultProps = {
	pageCount: 1,
	activePage: 1,
	setActivePage: () => {},
}

export default memo(Pagination);