import { Link } from "react-router-dom";
import { styled } from "styled-components";

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, #f9a8d4, #f3e8ff);
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
`;

const NavButton = styled(Link)`
  background: #fff;
  color: #6b7280;
  padding: 0.75rem 1.5rem;
  border-radius: 1.5rem;
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background: #fef3c7;
    color: #4b5563;
    transform: translateY(-2px);
  }
`;

const PawIcon = styled.span`
  font-size: 1.2rem;
`;

function Header() {
  return (
    <HeaderContainer>
      <Nav>
        <NavButton to="/">
          <PawIcon>🐾</PawIcon> 메인
        </NavButton>
        <NavButton to="/admin">
          <PawIcon>🐶</PawIcon> 어드민
        </NavButton>
      </Nav>
    </HeaderContainer>
  );
}

export default Header;
