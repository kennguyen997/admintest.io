import { common } from 'app/trans';
import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

interface Props {
  description?: string;
  metaImage?: string;
  title?: string;
  meta?: [];
}

const SEO: FC<Props> = ({ description, meta, title, metaImage }) => {
  const { t } = useTranslation();
  const metaDescription = description;
  const defaultTitle = 'Terafty';
  const defaultDescription = t(common.main_subtit);
  return (
    <Helmet
      title={title || defaultTitle}
      titleTemplate={title ? `%s - ${defaultTitle}` : undefined}
      meta={[
        {
          name: `og:site_name`,
          content: defaultTitle,
        },
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title || defaultTitle,
        },
        {
          property: `og:description`,
          content: metaDescription || defaultDescription,
        },
        {
          property: `og:image`,
          content: metaImage || `${window.location.origin}/Terafty_Logo.png`,
        },
        {
          property: `og:url`,
          content: `${window.location.href}`,
        },
        {
          property: `og:image:width`,
          content: '1280',
        },
        {
          property: `og:image:height`,
          content: '720',
        },
        {
          property: `og:type`,
          content: `website`,
        },
      ].concat(meta || [])}
    />
  );
};

SEO.defaultProps = {
  meta: [],
  description: ``,
};

export default SEO;
