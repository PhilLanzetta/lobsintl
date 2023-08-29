const THEME = {
  Table: `
        --data-table-library_grid-template-columns:  30% 30% repeat(2, minmax(0, 1fr)) 50px;

        @media screen and (max-width: 920px) {
          --data-table-library_grid-template-columns:  30% 30% minmax(0, 1.5fr) minmax(0, 1fr) 30px;
        }
      `,
  Row: `background-color: #000;
    color: #fff; font-size: 1.5rem;
    .td {
          border-bottom: 1px solid #fff;
        }
        @media screen and (max-width: 920px) {
          font-size: 0.75rem
        }`,
  HeaderRow: `background-color: #000; color: #fff; font-size: 1rem; font-weight: bold;  .th {
          border-bottom: 1px solid #fff;
          padding: 10px 0;
        }
        @media screen and (max-width: 920px) {
          font-size: 0.75rem;
        }`,
  BaseCell: `padding-right: 10px; padding-top: 10px; padding-bottom: 10px;
  &:last-of-type {
          text-align: right;
          padding-right: 20px;
        }
        &:first-of-type {
          padding-left: 20px;
        }
        @media screen and (max-width: 920px) {
         &:last-of-type {
          text-align: right;
          padding-right: 10px;
        } 
        }`,
}

export default THEME
