import styles from "./Label.module.sass"

const Label = ({ text, variant }) => {
    const validateVariant = /^(primary|success|warning|danger)$/
    const variantClass = {
        primary: styles.Label_primary,
        success: styles.Label_success,
        warning: styles.Label_warning,
        danger: styles.Label_danger
    }
    const computeVariantClass = validateVariant.test(variant) ? variantClass[variant] : styles.Label_primary
    const computeClass = `${styles.Label} ${computeVariantClass}`

    return (
        <label className={computeClass}>{text}</label>
    )
}

export default Label
