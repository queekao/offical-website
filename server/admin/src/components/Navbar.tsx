import { Button } from 'react-bootstrap'
import { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import PutAndPostFormModal from './PutAndPostFormModal'

// import { LinkContainer } from 'react-router-bootstrap'
function Header() {
  const context = useContext(AuthContext)
  const [basicModal, setBasicModal] = useState(false)
  const showFormModal = () => setBasicModal(!basicModal)
  const navigate = useNavigate()
  const setLogout = () => {
    context.onLogout()
    navigate('/')
  }
  const updatePassword = () => {
    showFormModal()
  }
  return (
    <>
      {basicModal && (
        <PutAndPostFormModal
          path={'auth/change-password'}
          basicModal={basicModal}
          setBasicModal={setBasicModal}
          method={'put'}
        />
      )}
      {['xxxl'].map((expand: any) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
          <Container fluid>
            <Button variant="warning" onClick={updatePassword}>
              修改密碼
            </Button>
            <Navbar.Brand href="/">傘下後台網站</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  傘下後台網站
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="/content/about">關於傘下</Nav.Link>
                  <Nav.Link href="/content/service">服務內容</Nav.Link>
                  <Nav.Link href="/content/feedback">
                    書院分享&客戶見證
                  </Nav.Link>
                  <NavDropdown
                    title="專區"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="/content/treemans">
                      樹人專區
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/content/news">
                      最新消息
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/content/richs">
                      富人專區
                    </NavDropdown.Item>

                    <NavDropdown.Item href="/content/videos">
                      影音專區
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link href="/content/qnas">常見問題Q&A</Nav.Link>
                  <Nav.Link href="/content/contacts">聯絡我們</Nav.Link>
                </Nav>
                <Button className="mt-4 w-100" onClick={setLogout}>
                  登出
                </Button>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  )
}

export default Header
