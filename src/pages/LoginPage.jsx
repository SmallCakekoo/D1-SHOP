import { useEffect, useId, useState } from 'react'
import Icon from '../components/ui/Icon'

const P = 'd1tiendas-commons-components-1-x-'
const L = 'vtex-login-2-x-'
const S = 'vtex-styleguide-9-x-'
const R = 'vtex-rich-text-0-x-'
const BANNER =
  'https://d1tiendas.vtexassets.com/assets/vtex.file-manager-graphql/images/5d183315-b5f5-407c-bf07-a8f27d9aced0___a1f95e3609c2a3c41ab894aca88049a1.jpg'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const BTN = 'vtex-button bw1 ba fw5 v-mid relative pa0 lh-solid br2'

function PrimaryButton({ children, ...props }) {
  return (
    <button
      type="submit"
      className={`${BTN} min-h-small t-action--small bg-action-primary b--action-primary c-on-action-primary hover-bg-action-primary hover-b--action-primary hover-c-on-action-primary pointer`}
      {...props}
    >
      <div className="vtex-button__label flex items-center justify-center h-100 ph5">
        <span className="t-small">{children}</span>
      </div>
    </button>
  )
}

function Field({ id, label, error, children }) {
  return (
    <div>
      {/* El texto visible de la etiqueta lo genera el CSS del tema; aquí solo queda para lectores de pantalla. */}
      <label htmlFor={id} className="vtex-store-components-3-x-visuallyHidden">
        {label}
      </label>
      {children}
      {error && (
        <span role="alert" className="t-mini c-danger db mt2">
          {error}
        </span>
      )}
    </div>
  )
}

function TextInput({ className = '', ...props }) {
  return (
    <div className="vtex-input-prefix__group flex flex-row items-stretch overflow-hidden br2 bw1 b--solid b--muted-4 hover-b--muted-3 h-regular">
      <input
        className={`${S}input ma0 border-box ${S}hideDecorators ${S}noAppearance br2 w-100 bn outline-0 bg-base c-on-base b--muted-4 hover-b--muted-3 t-body ph5 ${className}`}
        {...props}
      />
    </div>
  )
}

function Terms() {
  return (
    <div className={`${P}loginTextContainer`}>
      <div className={`${P}container flex tl items-start justify-start t-body c-on-base`}>
        <div className={`${P}wrapper`}>
          <p className={`lh-copy ${P}paragraph`}>
            Al crear mi perfil, autorizo de manera previa, expresa e informada a D1 S.A.S. a tratar mis datos
            personales para las finalidades establecidas en la{' '}
            <span className={`b ${P}strong`}>
              <a className={`${P}link`} href="#">
                Autorización de Tratamiento de Datos Personales
              </a>
            </span>{' '}
            y de conformidad con la{' '}
            <span className={`b ${P}strong`}>
              <a className={`${P}link`} href="#">
                Política de Tratamiento de Datos Personales
              </a>
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

// Esta versión no tiene servidor de autenticación: el formulario valida y lo dice con claridad.
const NO_BACKEND = 'El inicio de sesión no está disponible en esta versión de demostración.'

function PasswordForm({ onForgot, onSignUp }) {
  const emailId = useId()
  const passId = useId()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [visible, setVisible] = useState(false)
  const [errors, setErrors] = useState({})
  const [notice, setNotice] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    const next = {}
    if (!EMAIL_RE.test(email.trim())) next.email = 'Ingresa un correo electrónico válido.'
    if (!password) next.password = 'Ingresa tu contraseña.'
    setErrors(next)
    setNotice(Object.keys(next).length === 0 ? NO_BACKEND : '')
  }

  return (
    <div className={`${L}emailVerification ${L}emailAndPasswordForm w-100`}>
      <h3 className={`${L}formTitle t-body v-mid ttu tc relative pv2 ph3 br2`}>Ingresa tu correo y contraseña para continuar</h3>
      <form noValidate onSubmit={onSubmit}>
        <div className={`${L}inputContainer ${L}inputContainerEmail`}>
          <Field id={emailId} label="Correo electrónico*" error={errors.email}>
            <TextInput
              id={emailId}
              type="email"
              autoComplete="email"
              placeholder="tucorreo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>
        </div>
        <div className={`${L}inputContainer ${L}inputContainerPassword pv3 flex flex-column`}>
          <Field id={passId} label="Contraseña" error={errors.password}>
            <div className="relative">
              <div className="vtex-input-prefix__group flex flex-row items-stretch overflow-hidden br2 bw1 b--solid b--muted-4 hover-b--muted-3 h-regular">
                <input
                  id={passId}
                  type={visible ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`${S}input ma0 border-box ${S}hideDecorators ${S}noAppearance br2 br-0 br--left w-100 bn outline-0 bg-base c-on-base b--muted-4 hover-b--muted-3 t-body pl5`}
                />
                <span className="c-muted-2 fw5 flex items-center t-body bg-base vtex-input__suffix br2 bl-0 br--right pr5 pl3">
                  <button
                    type="button"
                    aria-label={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                    aria-pressed={visible}
                    className={`${L}eyeIcon--invisible pointer bn bg-transparent pa0`}
                    onClick={() => setVisible((v) => !v)}
                  >
                    <Icon id={visible ? 'mpa-eyesight--filled--off' : 'mpa-eyesight--filled--on'} size={16} />
                  </button>
                </span>
              </div>
            </div>
          </Field>
        </div>
        <div className={`${L}formLinkContainer flex justify-end ph0 pv2`}>
          <a
            href="#"
            className={`${L}forgotPasswordLink link dim c-link t-small`}
            onClick={(e) => {
              e.preventDefault()
              onForgot()
            }}
          >
            Olvidé mi contraseña
          </a>
        </div>
        {notice && (
          <p role="status" className="t-small c-muted-1 mv3">
            {notice}
          </p>
        )}
        <div className={`${L}formFooter bt b--muted-4 pt4 flex mt3`}>
          <div className={`${L}sendButton ml-auto`}>
            <PrimaryButton>Iniciar sesión</PrimaryButton>
          </div>
          <Terms />
        </div>
        <div className={`${L}formLinkContainer flex justify-center ph0 mt4`}>
          <a
            href="#"
            className={`${L}dontHaveAccount link dim c-link t-small`}
            onClick={(e) => {
              e.preventDefault()
              onSignUp()
            }}
          >
            Crea tu cuenta
          </a>
        </div>
      </form>
    </div>
  )
}

// Flujos de un solo campo: código de acceso, recuperar contraseña y crear cuenta.
function EmailOnlyForm({ title, submitLabel = 'Enviar', onBack }) {
  const emailId = useId()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    if (!EMAIL_RE.test(email.trim())) {
      setError('Ingresa un correo electrónico válido.')
      setNotice('')
      return
    }
    setError('')
    setNotice(NO_BACKEND)
  }

  return (
    <div className={`${L}emailVerification w-100`}>
      <h3 className={`${L}formTitle t-body v-mid ttu tc relative pv2 ph3 br2`}>{title}</h3>
      <form noValidate onSubmit={onSubmit}>
        <div className={`${L}inputContainer ${L}inputContainerEmail`}>
          <Field id={emailId} label="Correo electrónico*" error={error}>
            <TextInput
              id={emailId}
              name="email"
              type="email"
              autoComplete="email"
              placeholder="tucorreo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>
        </div>
        {notice && (
          <p role="status" className="t-small c-muted-1 mv3">
            {notice}
          </p>
        )}
        <div className={`${L}formFooter bt b--muted-4 pt4 flex mt3`}>
          <div className={`${L}backButton`}>
            <button
              type="button"
              className={`${BTN} min-h-small t-action--small bg-transparent b--transparent c-action-primary hover-b--transparent hover-bg-action-secondary hover-b--action-secondary pointer`}
              onClick={onBack}
            >
              <div className="vtex-button__label flex items-center justify-center h-100 ph5">
                <span className="flex items-center nr1">
                  <div className="mr2 nl2 flex items-center">
                    <Icon id="hpa-arrow-back" size={10} />
                  </div>
                  <div>
                    <span className="t-small ml2">Volver</span>
                  </div>
                </span>
              </div>
            </button>
          </div>
          <div className={`${L}sendButton ml-auto`}>
            <PrimaryButton>{submitLabel}</PrimaryButton>
          </div>
          <Terms />
        </div>
      </form>
    </div>
  )
}

const VIEWS = {
  code: 'Ingresa tu correo para recibir el código de acceso',
  forgot: 'Ingresa tu correo para recuperar tu contraseña',
  signup: 'Ingresa tu correo para crear tu cuenta',
}

export default function LoginPage() {
  const [view, setView] = useState('password')

  useEffect(() => {
    document.title = 'Iniciar sesión | D1'
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="vtex-render__container-id-login">
      <div className={`${P}containerLayout ${P}containerLayout--max-width ${P}containerLayout--login-page flex flex-column-reverse flex-row-ns`}>
        <div className={`${P}containerLayout ${P}containerLayout--max-width ${P}containerLayout--login-options flex flex-column`}>
          <div className={`${R}container ${R}container--login-title flex tl items-start justify-start t-body c-on-base`}>
            <div className={`${R}wrapper ${R}wrapper--login-title`}>
              <h1 className={`${R}heading ${R}heading--login-title t-heading-3 ${R}headingLevel3 ${R}headingLevel3--login-title ${R}heading-level-3`}>
                Bienvenido a D1
              </h1>
            </div>
          </div>
          <div
            className={`${L}content ${L}content--emailAndPassword flex relative bg-base justify-around overflow-visible pa4 center items-start-ns ${L}contentAlwaysWithOptions mw6-ns flex-column-reverse items-center flex-row-ns`}
          >
            <div className={`${L}loginOptionsContainer`}>
              <div className={`${L}options ${L}optionsSticky`}>
                <ul className={`${L}optionsList list pa0`}>
                  {view === 'password' && (
                    <li className={`${L}optionsListItem mb3`}>
                      <div className={`${L}button ${L}accessCodeOptionBtn`}>
                        <button
                          type="button"
                          className={`${BTN} min-h-regular t-action bg-action-secondary b--action-secondary c-on-action-secondary hover-bg-action-secondary hover-b--action-secondary hover-c-on-action-secondary pointer`}
                          onClick={() => setView('code')}
                        >
                          <div className="vtex-button__label flex items-center justify-center h-100 ph6">
                            <span>Código de acceso por email</span>
                          </div>
                        </button>
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            </div>
            <div className={`${L}contentForm db ph4`}>
              {view === 'password' ? (
                <PasswordForm onForgot={() => setView('forgot')} onSignUp={() => setView('signup')} />
              ) : (
                <EmailOnlyForm key={view} title={VIEWS[view]} onBack={() => setView('password')} />
              )}
            </div>
          </div>
        </div>
        <div className={`${P}containerImage ${P}containerImage--login-banner`}>
          <img
            src={BANNER}
            alt="Promotora de D1 señalando hacia arriba"
            className={`${P}imageElement ${P}imageElement--login-banner vtex-store-components-3-x-imageElement vtex-store-components-3-x-imageElement--login-banner`}
          />
        </div>
      </div>
    </div>
  )
}
