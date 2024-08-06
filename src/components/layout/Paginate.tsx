import styled from '@emotion/styled';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface PaginateProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Paginate = ({ currentPage, totalPages, onPageChange }: PaginateProps) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPreviousStyled
            href="#"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
        </PaginationItem>
        {[...Array(totalPages).keys()].map(pageIndex => (
          <PaginationItem key={pageIndex}>
            <PaginationLinkStyled
              href="#"
              onClick={() => handlePageChange(pageIndex + 1)}
              isActive={currentPage === pageIndex + 1}
            >
              {pageIndex + 1}
            </PaginationLinkStyled>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNextStyled
            href="#"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

const PaginationLinkStyled = styled(PaginationLink, {
  shouldForwardProp: prop => prop !== 'isActive',
})<{ isActive: boolean }>`
  color: ${({ isActive }) => (isActive ? '#56bec0' : '#000')};
`;

const PaginationPreviousStyled = styled(PaginationPrevious)<{ disabled: boolean }>`
  color: ${({ disabled }) => (disabled ? '#ccc' : '#000')};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};

  span {
    display: none;
  }
`;

const PaginationNextStyled = styled(PaginationNext)<{ disabled: boolean }>`
  color: ${({ disabled }) => (disabled ? '#ccc' : '#000')};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  span {
    display: none;
  }
`;

export default Paginate;
