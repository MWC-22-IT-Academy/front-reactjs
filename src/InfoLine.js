function InfoLine({ description, infoText, className }) {
  return (
    <p className={className}>
      {description}: {infoText}
    </p>
  );
}

export default InfoLine;
