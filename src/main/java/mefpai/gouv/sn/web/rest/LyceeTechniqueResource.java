package mefpai.gouv.sn.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import mefpai.gouv.sn.domain.LyceeTechnique;
import mefpai.gouv.sn.repository.LyceeTechniqueRepository;
import mefpai.gouv.sn.security.SecurityUtils;
import mefpai.gouv.sn.service.LyceeTechniqueService;
import mefpai.gouv.sn.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
// import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link mefpai.gouv.sn.domain.LyceeTechnique}.
 */
@RestController
@RequestMapping("/api")
public class LyceeTechniqueResource {

    private final Logger log = LoggerFactory.getLogger(LyceeTechniqueResource.class);

    private static final String ENTITY_NAME = "lyceeTechnique";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LyceeTechniqueService lyceeTechniqueService;

    private final LyceeTechniqueRepository lyceeTechniqueRepository;

    public LyceeTechniqueResource(LyceeTechniqueService lyceeTechniqueService, LyceeTechniqueRepository lyceeTechniqueRepository) {
        this.lyceeTechniqueService = lyceeTechniqueService;
        this.lyceeTechniqueRepository = lyceeTechniqueRepository;
    }

    /**
     * {@code POST  /lycee-techniques} : Create a new lyceeTechnique.
     *
     * @param lyceeTechnique the lyceeTechnique to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new lyceeTechnique, or with status {@code 400 (Bad Request)} if the lyceeTechnique has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/lycee-techniques")
    public ResponseEntity<LyceeTechnique> createLyceeTechnique(@Valid @RequestBody LyceeTechnique lyceeTechnique)
        throws URISyntaxException {
        log.debug("REST request to save LyceeTechnique : {}", lyceeTechnique);
        if (lyceeTechnique.getId() != null) {
            throw new BadRequestAlertException("A new lyceeTechnique cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LyceeTechnique result = lyceeTechniqueService.save(lyceeTechnique);
        return ResponseEntity
            .created(new URI("/api/lycee-techniques/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /lycee-techniques/:id} : Updates an existing lyceeTechnique.
     *
     * @param id the id of the lyceeTechnique to save.
     * @param lyceeTechnique the lyceeTechnique to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated lyceeTechnique,
     * or with status {@code 400 (Bad Request)} if the lyceeTechnique is not valid,
     * or with status {@code 500 (Internal Server Error)} if the lyceeTechnique couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/lycee-techniques/{id}")
    public ResponseEntity<LyceeTechnique> updateLyceeTechnique(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody LyceeTechnique lyceeTechnique
    ) throws URISyntaxException {
        log.debug("REST request to update LyceeTechnique : {}, {}", id, lyceeTechnique);
        if (lyceeTechnique.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, lyceeTechnique.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!lyceeTechniqueRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        LyceeTechnique result = lyceeTechniqueService.save(lyceeTechnique);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, lyceeTechnique.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /lycee-techniques/:id} : Partial updates given fields of an existing lyceeTechnique, field will ignore if it is null
     *
     * @param id the id of the lyceeTechnique to save.
     * @param lyceeTechnique the lyceeTechnique to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated lyceeTechnique,
     * or with status {@code 400 (Bad Request)} if the lyceeTechnique is not valid,
     * or with status {@code 404 (Not Found)} if the lyceeTechnique is not found,
     * or with status {@code 500 (Internal Server Error)} if the lyceeTechnique couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/lycee-techniques/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<LyceeTechnique> partialUpdateLyceeTechnique(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody LyceeTechnique lyceeTechnique
    ) throws URISyntaxException {
        log.debug("REST request to partial update LyceeTechnique partially : {}, {}", id, lyceeTechnique);
        if (lyceeTechnique.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, lyceeTechnique.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!lyceeTechniqueRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<LyceeTechnique> result = lyceeTechniqueService.partialUpdate(lyceeTechnique);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, lyceeTechnique.getId().toString())
        );
    }

    /**
     * {@code GET  /lycee-techniques} : get all the lyceeTechniques.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of lyceeTechniques in body.
     */
    @GetMapping("/lycee-techniques")
    public ResponseEntity<List<LyceeTechnique>> getAllLyceeTechniques(Pageable pageable) {
        log.debug("REST request to get a page of LyceeTechniques");
        if (SecurityUtils.hasCurrentUserThisAuthority("ROLE_ADMIN")) {
            Page<LyceeTechnique> page = lyceeTechniqueService.findAll(pageable);
            HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
            return ResponseEntity.ok().headers(headers).body(page.getContent());
        }
        return ResponseEntity
            .ok()
            .headers(
                PaginationUtil.generatePaginationHttpHeaders(
                    ServletUriComponentsBuilder.fromCurrentRequest(),
                    (lyceeTechniqueService.findByUserIsCurrentUser(pageable))
                )
            )
            .body((lyceeTechniqueRepository.findByUserIsCurrentUser(pageable)).getContent());
    }

    /**
     * {@code GET  /lycee-techniques/:id} : get the "id" lyceeTechnique.
     *
     * @param id the id of the lyceeTechnique to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the lyceeTechnique, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/lycee-techniques/{id}")
    public ResponseEntity<LyceeTechnique> getLyceeTechnique(@PathVariable Long id) {
        log.debug("REST request to get LyceeTechnique : {}", id);
        Optional<LyceeTechnique> lyceeTechnique = lyceeTechniqueService.findOne(id);
        return ResponseUtil.wrapOrNotFound(lyceeTechnique);
    }

    /**
     * {@code DELETE  /lycee-techniques/:id} : delete the "id" lyceeTechnique.
     *
     * @param id the id of the lyceeTechnique to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/lycee-techniques/{id}")
    public ResponseEntity<Void> deleteLyceeTechnique(@PathVariable Long id) {
        log.debug("REST request to delete LyceeTechnique : {}", id);
        lyceeTechniqueService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
