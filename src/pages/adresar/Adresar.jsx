import React, { useState, useMemo } from "react";
import { withRouter } from "react-router-dom";

import Pagination from "../../components/pagination/Pagination";
import Search from "../../components/search/Search";

import "./adresar.scss";

import Sort from "../../components/sort/Sort";
import ShowPerPage from "../../components/showPerPage/ShowPerPage";
import Person from "../../components/person/Person";
import LinkButton from "../../components/linkButton/LinkButton";

const Adresar = ({ contacts, history, match }) => {
  const [favourites, setFavourites] = [contacts.filter((item) => item.person.favourite)];
  const [total, setTotal] = useState(contacts.length);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState("");
  const [counter, setCounter] = useState(1);
  const [showPerPage, setShowPerPage] = useState(15);
  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage,
  });

  const onPaginationChange = (start, end) => {
    setPagination({
      start: start,
      end: end,
    });
  };

  const contactData = useMemo(() => {
    let computedContacts = contacts;

    if (match.path === "/adresar/omiljeni") {
      computedContacts = favourites;
    }

    let value = showPerPage * counter;
    onPaginationChange(value - showPerPage, value);

    if (search) {
      computedContacts = computedContacts.filter(
        (person) =>
          person.person.name.toLowerCase().includes(search.toLowerCase()) ||
          person.person.surname.toLowerCase().includes(search.toLowerCase()) ||
          person.person.contact.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sorting) {
      if (sorting === "asc") {
        computedContacts.sort((a, b) => a.person.surname.localeCompare(b.person.surname));
      } else if (sorting === "desc") {
        computedContacts.sort((a, b) => b.person.surname.localeCompare(a.person.surname));
      }
    }

    setTotal(computedContacts.length);

    return computedContacts
      .slice(pagination.start, pagination.end)
      .map((item) => <Person className="adresar__person" key={item.id} item={item} />);
  }, [
    counter,
    contacts,
    pagination.start,
    search,
    sorting,
    pagination.end,
    showPerPage,
    total,
    match,
  ]);

  return (
    <div className="adresar">
      <div className="adresar__header">
        <div className="adresar__header__left">
          <ShowPerPage
            setCounter={setCounter}
            showPerPage={showPerPage}
            setShowPerPage={setShowPerPage}
          />
          <Sort sorting={sorting} setSorting={setSorting} />
        </div>
        <Search
          onSearch={(value) => {
            setSearch(value);
            setCounter(1);
          }}
        />
      </div>
      <div className="adresar__search">
        <LinkButton onClick={() => history.push("/kontakt")}>Kreiraj kontakt</LinkButton>
        <LinkButton
          onClick={() => {
            match.url === "/adresar"
              ? history.replace("/adresar/omiljeni")
              : history.replace("/adresar");
          }}
        >
          {match.url === "/adresar" ? "Omiljeni" : "adresar"}
        </LinkButton>
      </div>
      <div className="list__title">
        <h3>ime</h3>
        <h3>prezime</h3>
        <h3>kontakt</h3>
        <h3>obradi</h3>
      </div>
      <div className="adresar__list">
        {
          // render contacts
          contactData
        }
      </div>
      <div className="adresar__footer">
        <Pagination
          showPerPage={showPerPage}
          onPaginationChange={onPaginationChange}
          total={total}
          counter={counter}
          setCounter={setCounter}
        />
      </div>
    </div>
  );
};

export default withRouter(Adresar);
