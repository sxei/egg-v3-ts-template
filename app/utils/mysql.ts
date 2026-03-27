export const toPlain = (model: any) => {
  return model?.get({ plain: true });
};
